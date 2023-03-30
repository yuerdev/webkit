import { BehaviorSubject } from 'rxjs'
export enum AsyncStage {
    STARTED = "STARTED",
    DONE = "DONE",
    FAILED = "FAILED",
    CANCEL = "CANCEL",
}

export interface IActorOpt<TArg = any, TOpts = any> {
    group?: string;
    name?: string;
    stage?: AsyncStage;
    effect?: (state: any, actor: Actor<TArg, TOpts>) => any;
    arg?: TArg;
    opts?: TOpts;
}

export class Actor<TArg = any, Topts = any>{
    group = 'UN_GROUP';
    name = 'UN_NAME';
    stage?: AsyncStage;
    opts: Topts = {} as Topts;

    constructor(opt: IActorOpt<TArg, Topts>) {
        this.group = opt.group || this.group;
        this.name = opt.name || this.name
        this.stage = opt.stage;
        this.opts = opt.opts || {} as Topts
    }

    static of<TArg = any, Topts = any>(group: string) {
        return new this<TArg, Topts>({ group })
    }

    invoke(dispatcher: { dispath: (actor: Actor) => void }) {
        dispatcher.dispath(this)
    }

    get type(): string {
        return `@@${this.group}/${this.name}${this.stage ? `::${this.stage}` : ""}`
    }
}


export class Store<TRoot extends { [key: string]: string } = {}> extends BehaviorSubject<TRoot>{

}