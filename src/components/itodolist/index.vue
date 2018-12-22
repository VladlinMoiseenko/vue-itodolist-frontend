<template>
    <v-content class="itodolist">
        <v-form>
            <v-container fluid >
                <v-layout row wrap justify-center fill-height>
                    <v-flex lg8 sm8 xs12>
                        <v-card>
                            <v-container>
                                <v-card-title>
                                    <div class="headline" align="center">
                                        <h3 class="title mr-3 black--text font-weight-light">iTodoList</h3>
                                    </div>
                                </v-card-title>
                                <div v-if="!isAuthenticated">
                                    <v-card-text>
                                        <p>
                                            Для работы с задачами
                                        <v-btn small
                                           @click="toauthorize"
                                        >
                                        войдите
                                        </v-btn>или
                                        <v-btn small
                                                @click="toregistration">
                                            зарегистрируйтесь
                                        </v-btn>
                                        </p>
                                    </v-card-text>
                                </div>
                                <div v-if="taskStatus === 'error'">
                                    <v-alert
                                            :value="true"
                                            type="error"
                                            outline
                                            dismissible
                                    >
                                        Ошибка авторизации!
                                    </v-alert>
                                </div>
                                <div v-if="isAuthenticated">
                                    <v-toolbar flat color="white">
                                        <v-dialog v-model="dialog" max-width="500px">
                                            <v-card>
                                                <v-card-title>
                                                    <span class="headline">{{ dialogTitle }}</span>
                                                </v-card-title>
                                                    <v-container grid-list-md>
                                                        <v-form ref="form" lazy-validation>
                                                            <v-text-field v-model="editedTask.title" label="Task title" required :rules="taskTitleRules"></v-text-field>
                                                            <v-text-field v-model="editedTask.content" label="Content"></v-text-field>
                                                        </v-form>
                                                    </v-container>
                                                <v-card-actions>
                                                    <v-btn small flat @click="dialog = false">Cancel</v-btn>
                                                    <v-spacer></v-spacer>
                                                    <v-btn small v-if="dialogTitle === 'New task'" @click="tasknew">Save</v-btn>
                                                    <v-btn small v-if="dialogTitle === 'Edit task'" @click="taskedit">Update</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                        <v-btn
                                                small
                                                @click="tasknewopen">
                                            new task
                                        </v-btn>
                                        <!--<v-btn icon @click="tasknewopen">-->
                                            <!--<v-icon large>add</v-icon>-->
                                        <!--</v-btn>-->
                                        <v-spacer></v-spacer>
                                        <v-btn icon @click="taskget">
                                            <v-icon>refresh</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <v-container>
                                        <v-data-table
                                                :headers="headers"
                                                :items="task"
                                                :loading="(taskStatus === 'loading')"
                                                class="elevation-1"
                                        >
                                            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                                            <template slot="items" slot-scope="task">
                                                <td>{{ task.item.title }}</td>
                                                <td class="text-xs-left">{{ task.item.content }}</td>
                                                <td class="text-xs-left">{{ getDate(task.item.created_at) }}</td>
                                                <td class="justify-center layout px-0">
                                                    <v-icon
                                                            small
                                                            class="mr-2"
                                                            @click="taskeditopen(task.item)"
                                                    >
                                                        edit
                                                      </v-icon>
                                                    <v-icon
                                                            small
                                                            @click="taskdelete(task.item)"
                                                    >
                                                        delete
                                                      </v-icon>
                                                </td>
                                            </template>
                                        </v-data-table>
                                    </v-container>
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

    import { mapGetters, mapState } from 'vuex'
    import moment from 'moment'

    export default {
        beforeMount(){
            if (!!localStorage.getItem('access_token')) {
                this.taskget()
            }
        },
        computed: {
            ...mapGetters('auth', [
                'isAuthenticated'
            ]),
            ...mapGetters('task', [
                'getTask', 'taskStatus'
            ]),
            ...mapState({
                task: state => state.task.mtask,
            }),
        },
        data () {
            return {
                dialog: false,
                dialogTitle: '',
                taskTitleRules: [
                    v => !!v || 'Title is required'
                ],
                headers: [
                    {
                        text: 'Task',
                        align: 'left',
                        sortable: false,
                    },
                    {
                        text: 'content',
                        sortable: false,
                    },
                    {
                        text: 'created_at',
                        sortable: false,
                    },
                    { text: 'Actions', value: 'name', sortable: false }
                ],
                editedTask: {
                    id: '',
                    title: '',
                    content: '',
                },
            }
        },
        methods: {
            toauthorize: function () {
                this.$router.push('/authorize')
            },
            toregistration: function () {
                this.$router.push('/registration')
            },
            getDate(datetime) {
                return moment(moment.unix(datetime).toISOString()).format('MMMM Do YYYY, h:mm:ss a');
            },
            taskget: function () {
                this.$store.dispatch('task/TASK_GET', {root:true});
            },
            taskdelete (item) {
                confirm('Вы уверены, что хотите удалить это задание?') &&
                this.$store.dispatch('task/TASK_DELETE', item.id, {root:true})
                    .then(() => {
                        setTimeout(() => {
                            this.taskget()
                        }, 1000)
                    });
            },
            tasknewopen () {
                this.dialogTitle = 'New task';
                this.dialog = true;
                this.editedTask = {
                    id: '',
                    title: '',
                    content: '',
                };
            },
            tasknew: function () {
                if (this.$refs.form.validate()) {
                    const {editedTask} = this;
                    this.$store.dispatch('task/TASK_CREATE', editedTask, {root: true})
                        .then(() => {
                            this.dialog = false;
                            setTimeout(() => {
                                this.taskget()
                            }, 1000)
                        });
                }
            },
            taskeditopen (item) {
                this.editedTask = Object.assign({}, item);
                this.dialogTitle = 'Edit task';
                this.dialog = true
            },
            taskedit (item) {
                if (this.$refs.form.validate())
                {
                    const { editedTask } = this;
                    this.$store.dispatch('task/TASK_UPDATE', editedTask, {root:true})
                        .then(() => {
                            this.dialog = false;
                            setTimeout(() => {
                                this.taskget()
                            }, 1000)
                        });
                }
            },
        },
    }
</script>
