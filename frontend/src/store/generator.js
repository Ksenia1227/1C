export default {
    namespaced: true,

    state: () => ({
        data: null
    }),

    mutations: {
        setData(state, payload) {
            state.data = payload
        }
    },

    actions: {
        async loadData({ commit }) {

            const response = await fetch(
                `${process.env.VUE_APP_SERVER}/api/generator/user`,
                {
                    method: "POST",
                    headers: {
                        "x-access-token": localStorage.getItem("accessToken")
                    }
                }
            )

            if (!response.ok) {
                window.alert("Ошибка загрузки данных")
                return
            }

            const data = await response.json()

            commit("setData", data)
        }
    }
}