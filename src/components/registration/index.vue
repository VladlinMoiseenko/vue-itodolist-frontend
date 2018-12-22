<template>
    <v-content class="registration">
        <v-form>
            <v-container fluid >
                <v-layout row wrap justify-center fill-height>
                    <v-flex lg6 sm6 xs12>
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    <div class="headline" align="center">
                                        <h3 class="title mr-3 black--text font-weight-light">Registration</h3>
                                    </div>
                                </v-card-title>
                                <div v-if="authStatus === ''">
                                    <v-form ref="form" v-model="valid" @submit.prevent="registration" lazy-validation>
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
                                            hint="At least 8 characters"
                                            counter
                                            @click:append="passwordShow = !passwordShow"
                                            required
                                        ></v-text-field>
                                        <v-text-field
                                                v-model="email"
                                                :rules="emailRules"
                                                label="E-mail"
                                                required
                                        ></v-text-field>
                                        <v-btn
                                            :disabled="!valid"
                                            @click="registration">Registration
                                        </v-btn>
                                    </v-form>
                                </div>
                                <div v-if="authStatus === 'success'" align="center">
                                    <v-btn small @click="continued">Continue</v-btn>
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
        name: 'registration',
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
                    v => !!v || 'Password is required',
                    v => (v && v.length >= 8) || 'Password must be at least 8 characters'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                ]
            }
        },
        methods: {
            continued: function () {
                this.$router.push('/')
            },
            registration: function () {
                if (this.$refs.form.validate())
                {
                    const {username, password, email} = this;
                    this.$store.dispatch('auth/AUTH_REGISTRATION', {username, password, email}, {root: true})
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