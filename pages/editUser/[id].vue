<template>
    <div>
        <!-- Alert -->
        <Teleport to="body">
            <UModal v-model="isOpen" prevent-close>
                <UCard :ui="{ ring: 'border border-green-500', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3 class="text-xl font-semibold leading-6 text-gray-900 dark:text-white">
                                แจ้งเตือน
                            </h3>
                            <UButton color="red" variant="ghost" class="-my-1" @click="confirmUpdate">X</UButton>
                        </div>
                    </template>

                    <p class="text-lg text-green-500">อัพเดทข้อมูลสำเร็จ}</p>
                </UCard>
            </UModal>
        </Teleport>

        <main class="mx-3 md:container md:mx-auto my-5 h-screen">
            <h1 class="text-xl font-bold text-center ">Update user</h1>

            <div class="border-b my-5" />
            <div class="p-3 border rounded-md shadow-md">
                <FormUpdateUser v-model:first-name="firstName" v-model:last-name="lastName" :image-url="imageUrl"
                    :user-name="userName" @submit-update="editUser" />
            </div>

            <NuxtLink to="/" class="bg-blue-500 hover:shadow-md text-white flex justify-center rounded-md mt-10 py-2">
                กลับหน้าหลัก
            </NuxtLink>

            <div>
                <p>{{ firstName }}</p>
                <p>{{ lastName }}</p>
            </div>
        </main>
    </div>
</template>

<script setup>
import FormUpdateUser from '~/components/FormUpdateUser.vue';

const store = useUserStore()
const route = useRoute()
const { id } = route.params

const { data: userInfo, } = await useAsyncData('users', () => store.getUserById(id))

const firstName = ref(userInfo.value.firstName)
const lastName = ref(userInfo.value.lastName)
const imageUrl = ref(userInfo.value.imageUrl)
const userName = ref(userInfo.value.userName)

const isOpen = ref(false)

async function editUser() {
    let userUpdate = {
        firstName: firstName.value,
        lastName: lastName.value,
    }

    isOpen.value = true
    await store.updateUser(userUpdate, userInfo.value.id)
}

function confirmUpdate() {
    firstName.value = ''
    lastName.value = ''
    imageUrl.value = ''
    userName.value = ''
    isOpen.value = false

    navigateTo('/')
    store.setUsers()

    setTimeout(() => {
        refreshNuxtData()
    }, 1000)
}
</script>