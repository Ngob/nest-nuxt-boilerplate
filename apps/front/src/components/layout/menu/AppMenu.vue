<template>
        <TieredMenu :model="items" class="h-screen sticky w-full">
        </TieredMenu>
</template>
<script setup lang="ts">


const items = computed(() => [
    {
        label: 'Users',
        icon: 'pi pi-fw pi-file',
        to: "/users"
    },
    {
        label: 'Page1',
        icon: 'pi pi-fw pi-pencil',
        to: "/demo/page1"
    },
    {
        label: 'Page2',
        icon: 'pi pi-fw pi-pencil',
        to: "/demo/page2"
    },
    {
        label: 'Page3',
        icon: 'pi pi-fw pi-pencil',
        to: "/demo/page3"
    },
    {
        separator: true
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }
]);

import MenuItem from "./MenuItem.vue";
import Icon1Square from "~/assets/images/icon-1-square.svg?component";
import Icon2Square from "~/assets/images/icon-2-square.svg?component";
import Icon3Square from "~/assets/images/icon-3-square.svg?component";
</script>
