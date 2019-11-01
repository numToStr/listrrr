import { Query, Resolver } from "type-graphql";
import { Template } from "./template.schema";
import { TemplateService } from "./template.service";

@Resolver(() => Template)
export class TemplateResolver {
    @Query(() => [Template], {
        nullable: "items",
    })
    templates(): Promise<Template[]> {
        return new TemplateService().templates();
    }
}
