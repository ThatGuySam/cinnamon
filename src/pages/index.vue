<script>
import { defaultMockupWidth } from '../components/new-message.vue'

</script>

<template>
    <div class="">
        <div class="build-page p-4">
            <builder
                class="relative"
                :style="{
                    transform: `translateX(${-1 * (defaultMockupWidth / 2) + 'px'})`,
                    left: `${defaultMockupWidth / 2}px`,
                }"
            />
        </div>
    </div>
</template>
