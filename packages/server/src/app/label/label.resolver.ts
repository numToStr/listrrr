import { Resolver, Query, Authorized } from "type-graphql";
import { Label } from "./label.schema";
import { LabelService } from "./label.service";

@Resolver()
export class LabelResolver {
    constructor(private labelService: LabelService) {}

    @Authorized()
    @Query(() => [Label], {
        nullable: "items",
    })
    labels(): Promise<Label[]> {
        return this.labelService.labels();
    }
}
