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
							<UButton color="red" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
								@click="isOpen = false, resetData(), goToHome()" />
						</div>
					</template>

					<p class="text-lg text-green-500">{{ alertMsg }}</p>
				</UCard>
			</UModal>
		</Teleport>

		<main class="mx-3 md:container md:mx-auto my-5 h-screen">
			<h1 class="text-xl font-bold text-center">
				Add user
			</h1>

			<div class="border-b my-5" />

			<div class="flex justify-center">
				<FormUser v-model:user-name="user.userName" v-model:first-name="user.firstName"
					v-model:last-name="user.lastName" v-model:email="user.email" :progress='progress' :img-url="imageUrl"
					:is-valid="isValid" @onfile-change="onFileChange" @reset-data="resetData" @submit="submitForm" />
			</div>

			<NuxtLink to="/" class="bg-blue-500 hover:shadow-md text-white flex justify-center rounded-md mt-10 py-2">
				กลับหน้าหลัก
			</NuxtLink>
		</main>
	</div>
</template>

<script setup>
import { useResetStorage } from '~/composables/useStorage';
import FormUser from '../components/FormUser.vue';

const store = useUserStore()
const progress = useProgress()

const imageUrl = useImageUrl()
const fileName = useFileName()
const isOpen = ref(false)
const fileNameImage = ref('')
const isValid = ref(true)
const alertMsg = ref('')

const user = reactive({
	userName: '',
	firstName: '',
	lastName: '',
	email: '',
	imgUrl: ''
})

watchEffect(() => {
	if (isOpen.value) {
		const reset = useResetStorage()
		console.log('reset auto', reset)
	}
})

async function submitForm() {
	validateForm()
	let createDate = Date.now()

	if (isValid.value) {
		const userData = {
			userName: user.userName,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			imageUrl: imageUrl.value,
			imageName: fileName.value,
			createDate: new Date(createDate).toLocaleDateString()
		}
		await store.addUser(userData)

		isOpen.value = true
		alertMsg.value = 'บันทึกรายการสำเร็จ'
	} else {
		return;
	}
}

function onFileChange(fileVal) {
	if (!fileVal) {
		isValid.value = false
	} else {
		const uploadImage = useUpload(fileVal)
		fileNameImage.value = fileVal.name;
		console.log(uploadImage)
	}
}

function validateForm() {
	if (user.userName === '' || user.firstName === '' || user.lastName === '', user.email === '' || imageUrl.value === '') {
		isValid.value = false
	} else {
		isValid.value = true;
	}
}

async function resetData() {
	user.userName = ''
	user.firstName = ''
	user.lastName = ''
	user.email = ''
	user.imgUrl = ''

	if (fileName.value) {
		const deleteFile = await useDelete(fileName.value)
		console.log(deleteFile)
		const resetStorage = useResetStorage()
		console.log(resetStorage)
	}
}

function goToHome() {
	navigateTo('/')
	store.setUsers()
	setTimeout(() => {
		refreshNuxtData()
	}, 1000)
}

</script>