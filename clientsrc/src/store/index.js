import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 15000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    activeLists: [],
    activeList: {},
    tasks: {},
  },
  //SECTION MUTATIONS
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, board) {
      state.activeBoard = board;
    },
    setActiveLists(state, lists) {
      state.activeLists = lists;
    },
    setActiveList(state, list) {
      state.activeList = list;
    },
    setActiveTasks(state, payload) {
      Vue.set(state.tasks, payload.listId, payload.tasks);
    },
  },
  actions: {
    //#SECTION Auth Stuff
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //!SECTION

    //SECTION Boards requests
    async getBoards({ commit, dispatch }) {
      try {
        let res = await api.get("boards");
        // console.log(res.data)
        commit("setBoards", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async getBoardById({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("boards/" + boardId);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async addBoard({ commit, dispatch }, boardData) {
      try {
        await api.post("boards", boardData);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },

    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        await api.delete("boards/" + boardId);
        dispatch("getBoards");
      } catch (error) {
        console.error(error);
      }
    },
    async editBoard({ commit, dispatch }, boardData) {
      try {
        await api.put("boards/" + boardData.id, boardData);
      } catch (error) {
        console.error(error);
      }
    },
    //!SECTION

    //SECTION Lists
    async addList({ commit, dispatch }, listData) {
      try {
        await api.post("lists", listData);
        dispatch("getBoardById", listData.boardId);
        dispatch("getListsByBoardId", listData.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    async getListsByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("boards/" + boardId + "/lists");
        commit("setActiveLists", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, listData) {
      try {
        await api.delete("lists/" + listData._id);
        dispatch("getBoardById", listData.boardId);
        dispatch("getListsByBoardId", listData.boardId);
      } catch (error) {
        console.error(error);
      }
    },
    async editList({ commit, dispatch }, listData) {
      try {
        await api.put("lists/" + listData.id, listData);
      } catch (error) {
        console.error(error);
      }
    },

    //!SECTION

    //SECTION Tasks
    //TODO Add tasks, give them a unique listId, add array of tasks @ listId to state => ask someone for help with vue-set
    async getTasksByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get("lists/" + listId + "/tasks");
        commit("setActiveTasks", { listId, tasks: res.data });
      } catch (error) {
        console.error(error);
      }
    },
    async addTask({ commit, dispatch }, taskData) {
      try {
        await api.post("tasks", taskData);
        dispatch("getTasksByListId", taskData.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit, dispatch }, taskData) {
      try {
        await api.delete("tasks/" + taskData.id);
        dispatch("getTasksByListId", taskData.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async markTaskIncomplete({ commit, dispatch }, taskData) {
      try {
        await api.put("tasks/" + taskData.id, {
          completed: false
        })
      } catch (error) {
        console.error(error)
      }
    },
    async markTaskComplete({ commit, dispatch }, taskData) {
      try {
        await api.put("tasks/" + taskData.id, {
          completed: true
        })
      } catch (error) {
        console.error(error)
      }
    },
    async moveTask({ commit, dispatch }, taskData) {
      try {
        await api.put("tasks/" + taskData.taskId, {
          listId: taskData.newListId,
        });
        dispatch("getTasksByListId", taskData.newListId);
        dispatch("getTasksByListId", taskData.oldListId);
      } catch (error) {
        console.error(error);
      }
    },

    //!SECTION

    //SECTION Comments
    async createComment({ commit, dispatch }, commentData) {
      try {
        await api.post(
          "tasks/" + commentData.taskId + "/comments",
          commentData
        );
        dispatch("getTasksByListId", commentData.listId);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, commentData) {
      try {
        await api.delete(
          "tasks/" + commentData.taskId + "/comments/" + commentData.comment._id
        );
        dispatch("getTasksByListId", commentData.listId);
      } catch (error) {
        console.error(error);
      }
    },

    //!SECTION
  },
});
