<template>
    <div class="card">
        <div class="card-header bg-info">
            <div class="row">
                <div class="col-lg-6 col-xs-12">
                    <h5>Limpiezas en progreso</h5>
                </div>
                <div class="col-lg-6 col-xs-12 d-flex justify-content-end">
                    <div class="alert alert-success resume-completed" role="alert">
                        <strong>Terminadas: {{ contador.terminadas }}  </strong>
                    </div>
                    <div class="alert alert-danger resume-completed" role="alert">
                        <strong>Pendientes:  {{ contador.pendientes }}  </strong>
                    </div>
                    <div class="progress-circle resume-completed d-flex">
                        <div class="navigation_pages">
                            <span @click="navigatePrev"> &#60; </span>
                            <span @click="navigateNext"> &#62; </span>
                        </div>
                        <p> {{ page }} / {{ totalItems }}  </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-body p-3" >
            <div class="row justify-content-center">
                <div v-for="(item, index) in filterItems" :key="index" class="col-lg-4 col-md-6 col-xs-12 item-work">
                    <div class="item">
                        <div class="media">
                            <div class="d-flex justify-content-center content-image">
                                <img src="http://pluspng.com/img-png/download-happy-person-png-images-transparent-gallery-advertisement-275.png"
                                     width="75" height="75"/>
                            </div>
                            <div class="media-body">
                                <h5 class="mt-0"> {{item.owner_department}} </h5>
                                <p>Limpieza : <span> {{ item.type_cleaning }} </span></p>
                                <p>Depa : <span> {{ item.user_staff }} </span></p>
                            </div>
                        </div>
                        <div>
                            Tiempo de limpieza: {{ restHours(item.time) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "inProgressPanel",
        components: {

        },
        data() {
            return {
              allItems: [],
              page: 1

            }
        },
         created () {
          this.changePage()
        },
        async mounted() {

        },
        computed: {
           filterItems () {
             return this.$store.getters["home/filtersItems"](this.page)
           },
           totalItems () {
            return this.$store.getters["home/totalItems"]
            },
           contador () {
            return this.$store.getters["home/count"]
          },
        },
        methods: {
            loadStatus() {
                this.$store.dispatch('home/accessStatusCleaning', this.$parent.auth)
            },
            loadCleanings() {
                this.$store.dispatch('home/progressCleaning', this.$parent.auth);
            },
            navigatePrev() {
              this.page -= 1
            },
            navigateNext() {
              this.page += 1
            },
            changePage () {   
              setTimeout(( ) => {
                if ( this.page < this.totalItems ) {
                  this.page += 1
                }
                else {
                  this.page = 1
                }
                this.changePage()
              }, 6000);
            },
            checkTime (i) {
              if (Number(i) ==  0) {
                i = "00" 
              }
              return i;
          },

          restHours (hora) {
            // hora del item ingresado
            let hora1 = hora.split(":")
            
            // obtengo la hora actual
            let horaActual = new Date()

            if ( Number(hora1[0]) <= horaActual.getHours() ) {
              return "00:00:00"
            }
            else {
              // seteo la hora del item en un objeto Date
              let diferencia = new Date()
              diferencia.setHours(hora1[0], hora1[1], hora1[2]);            
        
              // resta de horas, minutos y segundos
              let difHours, difMinutes, difSeconds
              difHours = diferencia.getHours() - horaActual.getHours()
              difMinutes = diferencia.getMinutes() - horaActual.getMinutes()
              difSeconds = diferencia.getSeconds() - horaActual.getSeconds()
        
              // seteando los nuevos valores en el objeto date
              diferencia.setHours(difHours, difMinutes , difSeconds );
        
              // obteniendo la diferencia 
              let newHours = this.checkTime(diferencia.getHours()) 
              let newMinutes = this.checkTime(diferencia.getMinutes())
              let newSeconds = this.checkTime(diferencia.getSeconds())
        
              // console.log(newHours)
              // console.log(newMinutes)
              // console.log(newSeconds)
        
            return `${newHours}:${newMinutes}:${newSeconds}`

            }
          }
        },     
    }
</script>

<style scoped lang="scss">

</style>
