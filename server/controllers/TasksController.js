import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { taskService } from "../services/TaskService";

//PUBLIC
export class TasksController extends BaseController {
  constructor() {
    super("api/tasks");
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      // .get('', this.getAll) NOTE We probably don't need this
      .get("/:id", this.getById)
      .post("", this.create)
      .post("/:id/comments", this.createComment)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
      .delete("/:taskId/comments/:commentId", this.deleteComment);
  }

  // async getAll(req, res, next) {
  //   try {
  //     //only gets lists by user who is logged in
  //     let data = await taskService.getAll(req.userInfo.email)
  //     return res.send(data)
  //   }
  //   catch (err) { next(err) }
  // }

  async getById(req, res, next) {
    try {
      let data = await taskService.getById(req.params.id, req.userInfo.email);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByListId(req, res, next) {
    try {
      let data = await taskService.getByListId(
        req.params.listId,
        req.userInfo.email
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await taskService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await taskService.createComment(req.params.id, req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await taskService.deleteComment(
        req.params.taskId,
        req.params.commentId
      );
      if (data) {
        res.send("commentDeleted");
      }
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      let data = await taskService.edit(
        req.params.id,
        req.userInfo.email,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await taskService.delete(req.params.id, req.userInfo.email);
      return res.send("Successfully deleted");
    } catch (error) {
      next(error);
    }
  }
}
