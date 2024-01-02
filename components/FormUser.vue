<template>
    <div class="mt-10 border rounded-md p-7 w-3/4 shadow-md inline-block">
        <form @submit.prevent="$emit('submitForm')">

            <div class="mb-3">
                <label for="userName" :class="[props.isValid ? '' : 'text-red-500']">User name :
                    <input type="text" id="userName" :value="props.userName"
                        @input="$emit('update:userName', $event.target.value)" class="px-3 border border rounded-md py-1"
                        :class="[props.isValid ? '' : 'border-red-500']" />
                </label>
            </div>

            <div class="mb-3">
                <label for="firstName" :class="[props.isValid ? '' : 'text-red-500']">First name :
                    <input type="text" id="firstName" :value="props.firstName"
                        @input="$emit('update:firstName', $event.target.value)" class="px-3 border border rounded-md py-1"
                        :class="[props.isValid ? '' : 'border-red-500']" />
                </label>
            </div>

            <div class="mb-3">
                <label for="lastName" :class="[props.isValid ? '' : 'text-red-500']">Last name :
                    <input type="text" id="lastName" :value="props.lastName"
                        @input="$emit('update:lastName', $event.target.value)" class="px-3 border border rounded-md py-1"
                        :class="[props.isValid ? '' : 'border-red-500']" />
                </label>
            </div>

            <div class="mb-3">
                <label for="email" :class="[props.isValid ? '' : 'text-red-500']">Email :
                    <input type="email" id="email" :value="props.email" @input="$emit('update:email', $event.target.value)"
                        class="px-3 border border rounded-md py-1" :class="[props.isValid ? '' : 'border-red-500']" />
                </label>
            </div>

            <div class="mb-3">
                <label class="block" :class="[props.isValid ? '' : 'text-red-500']">
                    <p class="mt-5 mb-2">อัพโหลดรูปภาพ : </p>
                    <img :src="props.imgUrl || 'https://dummyimage.com/100x100/635e63/fff'" class="w-[100px] h-[100px] mb-3"
                        :class="[props.isValid ? '' : 'ring ring-red-500']" />


                    <UProgress v-if="props.progress < 100 && props.progress > 0" :value="props.progress" indicator />

                    <input v-if="props.progress == 0" type="file" class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100
                        " @change="$emit('onfileChange', $event.target.files[0])" />


                    <p v-if="props.progress > 1 && props.progress == 100" class="text-green-500">อัพโหลดรูปภาพสำเร็จ</p>
                    <p v-if="props.progress > 0 && props.progress < 100" class="text-amber-500">...กำลังอัพโหลดรูปภาพ</p>
                </label>

                <p v-if="!props.isValid" class="my-3 text-red-500">* ข้อมูลไม่ถูกต้อง</p>
            </div>

            <div class="my-3">
                <button type="submit"
                    class="mt-5 rounded-md px-3 py-2 text-white bg-green-500 hover:shadow-md hover:bg-green-400">Submit</button>
                <button type="button"
                    class="mt-5 rounded-md ml-3 px-3 py-2 text-white bg-amber-500 hover:shadow-md hover:bg-amber-400"
                    @click="$emit('resetData')">Reset</button>
            </div>
        </form>
    </div>
</template>

<script setup>
const props = defineProps({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    imgUrl: String,
    progress: Number,
    isValid: Boolean
})

defineEmits([
    'update:userName',
    'update:firstName',
    'update:lastName',
    'update:email',
    'submitForm',
    'onfileChange',
    'resetData'
])
</script>