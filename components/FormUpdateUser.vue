<template>
    <form @submit.prevent="$emit('submitUpdate')">
        <div>
            <p class="mb-1 border-l-2 pl-3 border-green-500">{{ props.userName }}</p>
            <img :src="props.imageUrl" class="w-[100px] h-[120px] mb-5 active:border-green-500" />
        </div>
        <div>
            <input id="firstName" :value="props.firstName" placeholder="First name"
                @input="$emit('update:firstName', $event.target.value)"
                class="border-b-2 focus:border-blue-500  focus:outline-none focus:text-blue-500" />
        </div>

        <div>
            <input id="lastName" :value="props.lastName" placeholder="Last name"
                @input="$emit('update:lastName', $event.target.value)"
                class="border-b-2 focus:border-blue-500  focus:outline-none focus:text-blue-500" />
        </div>

        <div class="flex mt-10">
            <button type="submit"
                class="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-400 shadow-md">ยืนยัน</button>
        </div>
    </form>
</template>

<script setup>
const props = defineProps({
    firstName: String,
    lastName: String,
    imageUrl: String,
    userName: String
})

defineEmits([
    'update:firstName',
    'update:lastName',
    'submitUpdate'
])
</script>