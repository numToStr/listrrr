import { Query, Resolver, Authorized } from "type-graphql";
import { Template } from "./template.schema";
import { TemplateService } from "./template.service";
import { Selections } from "../../utils/decorator/selections.decorator";
import { MongoSelectionSet } from "../../@types/types";

@Resolver(() => Template)
export class TemplateResolver {
    constructor(private templateService: TemplateService) {}

    @Authorized()
    @Query(() => [Template], {
        nullable: "items",
    })
    templates(@Selections() select: MongoSelectionSet): Promise<Template[]> {
        return this.templateService.templates(select);
    }
}
