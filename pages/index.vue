<template>
    <div class="w-full md:container mx-auto">
        <!-- Alert -->
        <Teleport to="body">

            <UModal v-model="isOpen">
                <div class="p-4">
                    <p class="text-green-500 my-5">ต้องการลบรายการ {{ removeName }}</p>
                    <button class="bg-green-500 hover:bg-green-400 text-white px-3 py-2"
                        @click="confirmRemove">ตกลง</button>
                </div>
            </UModal>
        </Teleport>

        <header class="w-full flex items-center bg-teal-400 shadow-md h-[100px]">
            <h1 class="text-4xl font-bold text-center md:container mx-auto">หน้าหลัก</h1>
        </header>

        <main>
            <ul class=" grid grid-cols-1 mt-5 justify-items-center mb-10">
                <li>
                    <NuxtLink to="/addUser"
                        class="inline-block text-blue-500 border border-blue-500 p-3 rounded-xl text-xl font-semibold hover:border-b hover:border-blue-500">
                        Add user</NuxtLink>
                </li>
            </ul>
            <div class="border-b border-teal-500 my-5" />

            <ClientOnly>
                <p v-if="!haveUsers" class="text-center text-xl font-bold text-red-500 mt-5">ไม่มีข้อมูล Click
                    Add user เพื่อเพิ่มรายการ
                </p>


                <div v class="grid grid-cols-2 md:grid-cols-3 justify-items-center gap-3 px-3">
                    <div v-for="user in usersData" :key="user.id"
                        class="w-fit h-fit border relative rounded-md border-green-600 inline-block">

                        <button class="bg-red-500 hover:bg-red-400 text-white px-2 block absolute top-0 right-0"
                            @click="deleteItem(user.id, user.userName, user.imageName)">X</button>

                        <img :src="user.imageUrl" :alt="user.firstName" />
                        <div class="mt-3 px-3 pb-3">
                            <h2 class="text-green-600 font-bold border-l-4 border-red-500 pl-3 mb-3">{{ user.userName }}
                            </h2>
                            <p><span class="font-semibold">ชื่อ : </span>{{ user.firstName }}</p>
                            <p><span class="font-semibold">นามสกุล : </span>{{ user.lastName }}</p>
                            <p><span class="font-semibold">Email : </span>{{ user.email }}</p>
                            <p><span class="font-semibold">วันที่บันทึก : </span> : {{ user.createDate }}</p>

                            <div class="flex justify-end">
                                <NuxtLink :to="`/editUser/${user.id}`"
                                    class="text-blue-500 hover:cursor-pointer hover:text-blue-400 hover:underline p-1 block font-semibold">
                                    edit
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </ClientOnly>
        </main>
    </div>
</template>

<script setup>
const store = useUserStore()

const deleteByName = ref('')
const isOpen = ref(false)
const removeId = ref('')
const removeName = ref('')

const { data: usersData, refresh } = await useAsyncData('users', () => store.getUsers)
const haveUsers = computed(() => store.haveUsers)

function deleteItem(id, name, fileName) {
    deleteByName.value = fileName;
    isOpen.value = true
    removeId.value = id
    removeName.value = name
}

async function confirmRemove() {
    const deleteImage = await useDelete(deleteByName.value)
    await store.removeById(removeId.value.toString())

    store.setUsers()
    setTimeout(() => {
        refresh()
    }, 1000)

    isOpen.value = false
    console.log(deleteImage)
}
</script>