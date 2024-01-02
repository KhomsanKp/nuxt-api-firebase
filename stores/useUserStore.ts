import { defineStore } from 'pinia'

export const useUserStore = defineStore('users', {
    state: () => ({
        users: [] as UsersInfo[],
    }),
    getters: {
        getUsers: (state) => {
            return state.users
        },
        getUserById: (state) => {
            return (userId: String | any) => state.users.find((user: String | any) => user.id === userId)
        },
        haveUsers: (state) => {
            if (!state.users?.length) {
                return false
            } else {
                return true
            }
        }
    },
    actions: {
        setUsers() {
            const { data: users }: UsersInfo | any = useFetch('/api/user', { method: 'get' })
            this.users = users
        },
        async removeById(id: String) {
            const resRemove: String = await $fetch('/api/user/' + id, {
                method: 'delete'
            })
            console.log(resRemove)
        },
        async addUser(data: UsersInfo) {
            const resAdd: String = await $fetch('/api/user', {
                method: 'post',
                body: data
            })

            console.log(resAdd)
        },
        async updateUser(data: any, id: String) {
            const resUpdate: String = await $fetch('/api/user/' + id, {
                method: 'put',
                body: data
            })

            console.log('Updated => ', resUpdate)
        }
    }
})

interface UsersInfo {
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    imageUrl: String,
    createDate: String
}
