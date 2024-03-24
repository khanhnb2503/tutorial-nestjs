import mongoose from "mongoose";
type ITransform = (doc: any, id?: any) => any;

interface IPopulate {
  path: string;
  select?: string;
  transform?: ITransform;
  populate?: {
    path: string;
    model?: string;
    select?: string;
  }[];
}

export class CommonRepository<TModel extends mongoose.Document> {
  public TSchema: mongoose.Model<TModel>;

  findById(params: { id: any; projections?: any; populate?: IPopulate[] }, options?: { middlewares?: any }) {
    const obj = this.TSchema.findById(params.id, params.projections || {}, options);
    if (params.populate) {
      obj.populate(params.populate);
    }
    return obj.exec();
  }
} 