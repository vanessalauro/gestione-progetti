<template>
  <div class="container-notification">
    <h4>Notifiche</h4>
    <hr class="mr-5" />
    <div class="card">
      <div class="card-body">
        <div class="row m-auto p-5 text-center" v-if="loading">
          <div class="col-sm-12">
            <i class="mdi mdi-loading mdi-spin mdi-48px"></i>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="(notifications.length === 0 && !loading)">
        <div class="row m-auto p-5 text-center">
          <div class="col-sm-12">
            <p>Nessuna notifica presente</p>
          </div>
        </div>
      </div>
      <div class="card-body" v-if="(notifications.length > 0 && !loading)">
        <div class="text-center">
          <v-pagination v-model="page" :length="Math.ceil(notifications.length / 10)" rounded="circle"></v-pagination>
        </div>
        <table class="table table-hover text-center">
          <thead>
            <tr>
              <!--<th scope="col" class="table-header"></th>-->
              <th scope="col" class="table-header">ID Notifica</th>
              <th scope="col" class="table-header">Descrizione notifica</th>
              <th scope="col" class="table-header">Data notifica</th>
              <th scope="col" class="table-header">Operatore</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="notification in notifications" :key="notification.id">
              <!--<td>
                <i v-if="!notification.read" class="mdi mdi-circle" style="font-size: 10px;"></i>
              </td>-->
              <td>{{ notification._id.substring(0, 10) }}</td>
              <td>{{ notification.body }}</td>
              <td>{{ formatDate(notification.dataNotifica) }}</td>
              <td>{{ notification.operatore.cognome }} {{ notification.operatore.nome }}</td>
              <td :class="{ 'is-read': notification.isRead, color: notification.isRead ? 'red' : 'black' }"></td>
            </tr>
          </tbody>
        </table>

        <pagination :total-items="notifications.length" :per-page="10" @page-change="onPageChange" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { toRaw } from "vue";

export default {
  name: "Notifications",
  data() {
    return {
      notifications: [
        /*{
          id: 1,
          title: "Notifica 1",
          body: "Questo è il corpo della notifica 1.",
          dataNotifica: "2022-01-01",
          read: false
        },
        {
          id: 2,
          title: "Notifica 2",
          body: "Questo è il corpo della notifica 2.",
          dataNotifica: "2022-05-01",
          read: true
        },
        {
          id: 3,
          title: "Notifica 3",
          body: "Questo è il corpo della notifica 3.",
          dataNotifica: "2022-04-01",
          read: false
        },*/
      ],
    };
  },
  mounted() {
    this.caricaNotifiche();
  },
  methods: {
    caricaNotifiche() {
      this.loading = true;
      this.notifications = [];
      // event.preventDefault();
      return axios
        .get("http://localhost:3000/caricaNotifiche")
        .then((response) => {
          console.log("Risposta GET:", response.data);
          setTimeout(() => {
            this.loading = false;
            this.notifications = response.data.notifiche;

            this.orderNotifiche();
            window.onbeforeunload = null;
          }, 3000);
        });
    },
    markAsRead(notification) {
      this.notifications.splice(this.notifications.indexOf(notification), 1);
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY"); // Esempio: 01/01/2022
    },
    orderNotifiche() {
      this.notifications.sort((a, b) => {
        return new Date(b.dataNotifica) - new Date(a.dataNotifica);
      });
    },
    onPageChange(page) {
      // aggiorna l'elenco delle persone per mostrare la pagina corrente
      this.notifications = this.notifications.slice((page - 1) * 10, page * 10);
    },
  },
};
</script>

<style>
.container-notification {
  width: 80%;
  margin: 100px auto;
}

.notifications {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notification {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.notification strong {
  font-weight: bold;
}

.notification p {
  margin: 0;
}

.read-button {
  background-color: #ccc;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.is-read {
  background-color: #c1efef !important;
}
</style>