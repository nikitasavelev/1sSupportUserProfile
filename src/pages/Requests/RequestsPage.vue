<template>
    <div>       
      <request-item v-for="request in shownRequests" :request="request" :key="request.id"></request-item>
      <v-pagination @input="onPageChange" :total-visible="8" :length="16" v-model="page"></v-pagination>
    </div>
</template>
<script>
import axios from "axios";
import { serverAPIUrls } from "Constants/SERVER_API_URLS.js";
import RequestItem from "./RequestItem";
export default {
  name: "RequestsPage",
  props: {},
  components: { RequestItem},
  data() {
    return {
      page: 1,
      requests: [
        {
          id: "32",
          theme: "Theme1",
          status: "Status1",
          date: "22.10.2018",
          rating: 3
        },
        {
          id: "33",
          theme: "Theme2",
          status: "Status2",
          date: "23.10.2018",
          rating: 2
        },
        { id: "34", theme: "Theme3", status: "Status3", date: "24.10.2018" },
        { id: "35", theme: "Theme4", status: "Status4", date: "25.10.2018" },
        {
          id: "36",
          theme: "Theme5",
          status: "Status5",
          date: "26.10.2018",
          rating: 5
        },
        {
          id: "37",
          theme: "Theme6",
          status: "Status6",
          date: "27.10.2018",
          rating: 1
        },
        { id: "38", theme: "Theme7", status: "Status7", date: "28.10.2018" },
        { id: "39", theme: "Theme8", status: "Status8", date: "29.10.2018" }
      ],
      shownRequests: [
        {
          id: "32",
          theme: "Theme1",
          status: "Status1",
          date: "22.10.2018",
          rating: 3
        },
        {
          id: "33",
          theme: "Theme2",
          status: "Status2",
          date: "23.10.2018",
          rating: 2
        },
        { id: "34", theme: "Theme3", status: "Status3", date: "24.10.2018" },
        { id: "35", theme: "Theme4", status: "Status4", date: "25.10.2018" }
      ]
    };
  },
  methods: {
    onPageChange() {
      //console.log(this.page); // current chosen page
      /* request new data for shown requests */
    }
  },
  mounted() {}
};
</script>
