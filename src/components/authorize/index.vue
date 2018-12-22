<template>
    <v-content class="authorize">
        <v-form>
            <v-container fluid >
                <v-layout row wrap justify-center fill-height>
                    <v-flex lg6 sm6 xs12>
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    <div class="headline" align="center">
                                        <h3 class="title mr-3 black--text font-weight-light">Sign in</h3>
                                    </div>
                                </v-card-title>
                                <div v-if="authStatus === ''">
                                    <v-form ref="form" v-model="valid" @submit.prevent="authorize" lazy-validation>
                                        <v-text-field
                                            v-model="username"
                                            :rules="usernameRules"
                                            label="Username"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="password"
                                            :append-icon="passwordShow ? 'visibility_off' : 'visibility'"
                                            :rules="passwordRules"
                                            :type="passwordShow ? 'text' : 'password'"
                                            name="input-10-1"
                                            label="Password"
                                            @click:append="passwordShow = !passwordShow"
                                            required
                                        ></v-text-field>
                                        <v-toolbar flat color="white">
                                        <v-btn
                                            :disabled="!valid"
                                            @click="authorize">Login
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn small @click="toregistration">Registration</v-btn>
                                        </v-toolbar>
                                    </v-form>
                                </div>
                                <div v-if="authStatus === 'success'" align="center">
                                    <v-btn small @click="continued">Continue</v-btn>
                                </div>
                                <div v-if="authStatus === 'error'">
                                    <v-alert
                                            :value="true"
                                            type="error"
                                            outline
                                    >
                                        Данные не корректны. Повторите авторизацию или зарегистрируйтесь.
                                    </v-alert>
                                    <v-toolbar flat color="white">
                                        <v-btn @click="toauthorize">Login</v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn @click="toregistration">Registration</v-btn>
                                    </v-toolbar>
                                </div>
                                <div class="text-xs-center" v-if="authStatus === 'loading'">
                                    <v-progress-circular
                                            indeterminate
                                            color="blue"
                                    ></v-progress-circular>
                                </div>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-content>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: 'authorize',
        computed: {
            ...mapGetters('auth', ['authStatus'])
        },
        data () {
            return {
                valid: true,
                username: '',
                usernameRules: [
                    v => !!v || 'Username is required'
                ],
                password: '',
                passwordShow: false,
                passwordRules: [
                    v => !!v || 'Password is required'
                ],
            }
        },
        methods: {
            toauthorize: function () {
                this.$store.dispatch('auth/AUTH_CLEAR', {root:true});
                this.$router.push('/authorize')
            },
            toregistration: function () {
                this.$store.dispatch('auth/AUTH_CLEAR', {root:true});
                this.$router.push('/registration')
            },
            continued: function () {
                this.$router.push('/')
            },
            authorize: function () {
                if (this.$refs.form.validate())
                {
                    const { username, password } = this;
                    this.$store.dispatch('auth/AUTH_AUTHORIZE', { username, password }, {root:true})
                }
            }
        },
    }
</script>

<style scoped>
    .v-progress-circular {
        margin: 1rem;
    }
</style>
