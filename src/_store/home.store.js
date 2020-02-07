const state = {
    pages: null,
    activePage: 1,
    countRecords: null,
    itemsPerPage: 6,
    title: 'Home',
    status: {},
    inProgressShow: [],
    inProgress: [],
    insideDepartment: [],
    nextShow: [],
    activePageNext: 1,
    pagesNext: null,
    countRecordsNext: null,
    nextCleaning: [],
    itemsSelected: [],
    allItems: [
        { 
            'owner_department' : 'Henry',
            'user_staff' : 'Elizabeth',
            'type_cleaning' : 'A',
            'time' : '20:11:00',
        },
        { 
            'owner_department' : 'Maria pezo',
            'user_staff' : 'Vega',
            'type_cleaning' : 'A',
            'time' : '12:11:00',
        },
        { 
            'owner_department' : 'Alessandro De Souza	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '13:11:00',
        },
        { 
            'owner_department' : 'Alfredo Benavides 2	',
            'user_staff' : 'Bob Esponja',
            'type_cleaning' : 'A',
            'time' : '14:11:00',
        },
        { 
            'owner_department' : 'Bárbara Pérez Egaña	',
            'user_staff' : 'Ludovico astaranga',
            'type_cleaning' : 'A',
            'time' : '11:11:00',
        },
        { 
            'owner_department' : 'Beto Alarcón	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '08:11:00',
        },
        { 
            'owner_department' : 'Bianca Botto	',
            'user_staff' : 'Bob Esponja',
            'type_cleaning' : 'A',
            'time' : '13:11:00',
        },
        { 
            'owner_department' : 'Brenda Levi	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '21:11:00',
        },
        { 
            'owner_department' : 'Moises Avila	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '12:11:00',
        },
        { 
            'owner_department' : 'Monica Diez	',
            'user_staff' : 'Power rangers',
            'type_cleaning' : 'A',
            'time' : '11:11:00',
        },
        { 
            'owner_department' : 'Natalia Dongo 1 NEW	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '14:11:00',
        },
        { 
            'owner_department' : 'Omar P. Rashid	',
            'user_staff' : 'Vega',
            'type_cleaning' : 'A',
            'time' : '20:11:00',
        },
        { 
            'owner_department' : 'Oscar Oré	',
            'user_staff' : 'Bob Esponja',
            'type_cleaning' : 'A',
            'time' : '07:11:00',
        },
        { 
            'owner_department' : 'Patricia Granadino X	',
            'user_staff' : 'Elizabeth',
            'type_cleaning' : 'A',
            'time' : '20:11:00',
        },
        { 
            'owner_department' : 'Patricia Granadino3X	',
            'user_staff' : 'Ludovico astaranga',
            'type_cleaning' : 'A',
            'time' : '10:11:00',
        },
        { 
            'owner_department' : 'Vicky Bracamonte	',
            'user_staff' : 'Vega',
            'type_cleaning' : 'A',
            'time' : '09:11:00',
        },
        { 
            'owner_department' : 'Yerson - Diagonal C	',
            'user_staff' : 'Power rangers',
            'type_cleaning' : 'A',
            'time' : '19:11:00',
        },
        { 
            'owner_department' : 'Yerson - Diagonal d	',
            'user_staff' : 'Vega',
            'type_cleaning' : 'A',
            'time' : '20:11:00',
        },
        { 
            'owner_department' : 'Yerson - Diagonala	',
            'user_staff' : 'Bob Esponja',
            'type_cleaning' : 'A',
            'time' : '23:11:00',
        },
        { 
            'owner_department' : 'Fernando H (J. Gonz)	',
            'user_staff' : 'Power rangers',
            'type_cleaning' : 'A',
            'time' : '21:11:00',
        },
        { 
            'owner_department' : 'Gonzalo Gutiérrez	',
            'user_staff' : 'Ludovico astaranga',
            'type_cleaning' : 'A',
            'time' : '20:11:00',
        },
        { 
            'owner_department' : 'Gonzalo Gutiérrez	',
            'user_staff' : 'Patricio del mar',
            'type_cleaning' : 'A',
            'time' : '08:11:00',
        }
    ]
}

const actions = {
    async progressCleaning({commit}, auth) {
        const generated_token = `Bearer ${auth.token}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': generated_token}
        };
        let jsonResponse = await fetch(`${auth.url}/access/staff/control/cleaning/test`, requestOptions);
        let data = await jsonResponse.json();
        commit('set_progress', data.data)
    },
    async accessStatusCleaning({commit}, auth) {

        const generated_token = `Bearer ${auth.token}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': generated_token}
        };
        try {
            const jsonResponse = await fetch(`${auth.url}/access/status/cleaning`, requestOptions);
            let data = await jsonResponse.json()
            if (data.success) {
                commit('set_status', data.data)
            }
        } catch (err) {
            console.log(err)
        }

    },
    async staffInsideDepartment({commit}, auth) {

        const generated_token = `Bearer ${auth.token}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': generated_token}
        };
        try {
            const jsonResponse = await fetch(`${auth.url}/access/staff/inside/department`, requestOptions);
            let data = await jsonResponse.json()
            if (data.success) {
                commit('set_inside_department', data.data)
            }
        } catch (err) {
            console.log(err)
        }

    },
    async accesNextCleaning({commit}, auth) {

        const generated_token = `Bearer ${auth.token}`;
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': generated_token}
        };
        try {
            const jsonResponse = await fetch(`${auth.url}/access/next/cleaning`, requestOptions);
            let data = await jsonResponse.json()
            if (data.success) {
                commit('set_next_cleaning', data.data)
            }
        } catch (err) {
            console.log(err)
        }

    },
    showPageRegister({commit}, data) {
        commit('set_data_x_page', data)
    },
    showPageRegisterNext({commit}, data) {
        commit('set_data_x_page_next', data)
    }
};

const mutations = {
    set_data_x_page(state, data) {
        state.inProgressShow = data.narr;
        state.activePage = data.page;
    },
    set_data_x_page_next(state, data) {
        state.nextShow = data.narr;
        state.activePageNext = data.page;
    },
    change_title(state, title) {
        state.title = title;
    },
    set_progress(state, inProgress) {
        state.inProgress = inProgress;
    },
    set_status(state, status) {
        state.status = status;
    },
    set_inside_department(state, insideDepartment) {
        state.insideDepartment = insideDepartment;
    },
    set_next_cleaning(state, next_cleaning) {
        state.nextCleaning = next_cleaning;
    }
}

const getters = {
  filtersItems: (state) => (numb) => {
      let init =  (numb -1) * 6
      let fin = ((numb -1) * 6) + 6
      let newArr = state.allItems.slice(init, fin )
      state.itemsSelected = newArr
      return newArr
    },
    totalItems: (state) => {
      let t = Math.ceil(state.allItems.length / 6)
      return t
    },
    count: (state) => {       
      let horaActual = new Date()
      let terminadas = 0
      let pendientes = 0

      state.itemsSelected.map((item) => {
        let hora1 = item.time.split(":")
        if ( Number(hora1[0]) <= horaActual.getHours() ) {
          terminadas ++
        }
        else {
          pendientes ++
        }
      })

      let newI = { "terminadas": terminadas, "pendientes": pendientes }
      return newI
    }
}




export const home = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
