<template>
    <v-content class="profile">
        <v-form>
            <v-container fluid >
                <v-layout row wrap justify-center fill-height>
                    <v-flex lg6 sm6 xs12>
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    <div class="headline" align="center">
                                        <h3 class="title mr-3 black--text font-weight-light">Profile</h3>
                                    </div>
                                </v-card-title>
                                <v-card-text>
                                    <p><strong>id:</strong> {{profile.id}}</p>
                                    <p><strong>email:</strong> {{profile.email}}</p>
                                    <p><strong>created_at:</strong> {{profile.created_at}}</p>
                                    <p><strong>status:</strong> {{profile.status}}</p>
                                    <p><strong>username:</strong> {{profile.username}}</p>
                                </v-card-text>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
    </v-content>
</template>

<script>

    import { mapState } from 'vuex'

    export default {
        name: 'profile',
        computed: {
            ...mapState({
                profile: state => state.profile.mprofile,
            })
        },
    }
</script>

<style lang="scss" scoped>
    .profile{
        margin-top: 1em;
        display: flex;
    }
</style>
