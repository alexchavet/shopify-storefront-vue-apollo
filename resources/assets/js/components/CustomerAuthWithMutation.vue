<template>
    <div class="CustomerAuth" :class="{'CustomerAuth--open' : isCustomerAuthOpen}">
        <button
                @click="closeCustomerAuth(); resetErrorMessages(); resetInputFields();"
                class="CustomerAuth__close">
            ×
        </button>
        <div class="CustomerAuth__body">
            <h2 class="CustomerAuth__heading">{{newCustomer ? 'Create your Account' : 'Log in to your account'}}</h2>
            <div v-if="nonFieldErrorMessage" class="error">{{nonFieldErrorMessage}}</div>
            <label class="CustomerAuth__credential">
                <input class="CustomerAuth__input" type="email"
                       placeholder="Email" name="email"
                       v-model="model.email"
                >

                <div class="error" v-if="emailErrorMessage" v-bind="emailErrorMessage"></div>

            </label>
            <label class="CustomerAuth__credential">
                <input class="CustomerAuth__input" type="password"
                       placeholder="Password" name="password"
                       v-model="model.password"
                >
                <div class="error" v-if="passwordErrorMessage" v-bind="passwordErrorMessage"></div>
            </label>
            <button class="CustomerAuth__submit button"
                    type="submit" @click="handleSubmit">
                {{newCustomer ? 'Create Account' : 'Log in'}}
            </button>
        </div>
    </div>
</template>

<script>
    import {
        customerCreate,
        customerAccessTokenCreate
    } from './../queries/auth';

    export default {
        data() {
            return {
                model: {
                    email: '',
                    password: ''
                },
                nonFieldErrorMessage: null,
                emailErrorMessage: null,
                passwordErrorMessage: null
            }
        },

        props: {
            closeCustomerAuth: {
                type : Function
            },
            associateCustomerCheckout: {
                type : Function
            },
            showAccountVerificationMessage: {
                type : Function
            },
            newCustomer: {
                type : Boolean
            },
            isCustomerAuthOpen: {
                type : Boolean
            },

        },
        methods: {
            resetErrorMessages() {
                this.nonFieldErrorMessage = null;
                this.emailErrorMessage = null;
                this.passwordErrorMessage = null;
            },
            resetInputFields() {
                this.email = '';
                this.password = '';
            },
            handleSubmit() {
                this.resetErrorMessages();
                const email = this.model.email;
                const password = this.model.password;

                if (this.newCustomer) {
                    this.createCustomerAccount(email, password)
                } else {
                    this.loginCustomerAccount(email, password)
                }
            },
            createCustomerAccount(email, password) {
                const input = {
                    email: email,
                    password: password
                };
                this.$apollo.mutate({
                    // Query
                    mutation: customerCreate,
                    // Parameters
                    variables: {input}
                }).then((res) => {
                    if (res.data.customerCreate.customer) {
                        this.closeCustomerAuth();
                        this.showAccountVerificationMessage();
                    }
                    else {
                        res.data.customerCreate.userErrors.forEach(function (error) {
                            if (error.field) {
                                this[error.field + "ErrorMessage"] = error.message;
                            } else {
                                this.nonFieldErrorMessage = error.message;
                            }
                        }.bind(this));
                    }
                }).catch((error) => {
                    console.error(error)
                });
            },
            loginCustomerAccount(email, password) {
                const input = {
                    email: email,
                    password: password
                };
                this.$apollo.mutate({
                    // Query
                    mutation: customerAccessTokenCreate,
                    // Parameters
                    variables: {input}
                }).then((res) => {
                    if (res.data.customerAccessTokenCreate.customerAccessToken) {
                        this.associateCustomerCheckout(res.data.customerAccessTokenCreate.customerAccessToken.accessToken);
                    } else {
                        res.data.customerAccessTokenCreate.userErrors.forEach(function (error) {
                            if (error.field != null) {
                                this[error.field + "ErrorMessage"] = error.message
                            } else {
                                this.nonFieldErrorMessage = error.message;
                            }
                        }.bind(this));
                    }
                }).catch((error) => {
                    console.error(error)
                });
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
