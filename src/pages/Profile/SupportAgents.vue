<template>
    <div>
        <v-card v-for="manager in agents" :key="manager.name" class="py-3 px-2 ml-2" max-width="400"> 
            <v-flex>
                <v-layout justify-space-around>
                    {{role}}: {{manager.name}}
                </v-layout> 
                <v-divider></v-divider>   
                <v-layout justify-space-around class="mt-2">
                    <v-btn class="text-capitalize">Написать</v-btn>
                    <v-btn class="text-capitalize">Позвонить</v-btn>
                </v-layout>                     
            </v-flex>
        </v-card> 
    </div> 
</template>

<script>
export default {
  name: "SupportAgents",
  props: {
    agents: [],
    role: "",
  }
};
</script>
