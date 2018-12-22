<template>
  <v-app>
    <v-toolbar>
        <v-toolbar-title>
            <v-btn flat href='http://www.vladlin.ru/' target="_blank"  v-text="title"></v-btn>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn flat @click="itodolist">iTodoList</v-btn>
        <v-btn flat v-if="!isAuthenticated" @click="authorize">Login</v-btn>
        <v-btn flat v-if="isAuthenticated" @click="profile">Profile</v-btn>
        <v-btn flat v-if="isAuthenticated" @click="logout">Logout ({{ username }})</v-btn>
    </v-toolbar>
    <transition name="fade">
      <router-view/>
    </transition>
    <v-footer app>
      <v-layout row wrap justify-center>
        <div>Vladlin Moiseenko {{ new Date().getFullYear() }}
            <v-btn small href="mailto:info@vladlin.ru">info@vladlin.ru</v-btn>
        </div>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import VLabel from "vuetify/lib/components/VLabel/VLabel";
  import { mapGetters, mapState, mapActions  } from 'vuex'

  export default {
      components: {VLabel}, data () {
          return {
            title: 'vladlin.ru'
          }
      },
      computed: {
          ...mapGetters('auth', [
              'isAuthenticated', 'authStatus'
          ]),
          ...mapGetters('profile', [
              'getProfile',
          ]),
          ...mapState({
              token: state => state.auth.token,
              username: state => state.auth.user
          }),
      },
      methods: {
          itodolist: function () {
              this.$router.push('/')
          },
          authorize: function () {
              this.$router.push('/authorize')
          },
          logout: function () {
              this.$store.dispatch('auth/AUTH_LOGOUT', {root:true})
              .then(() => this.$router.push('/'))
          },
          profile: function () {
              this.$store.dispatch('profile/PROFILE_GET', {root:true})
                  .then(() => this.$router.push('/profile'))
          }
      },
  }

</script>

<style lang="scss" scoped>

</style>