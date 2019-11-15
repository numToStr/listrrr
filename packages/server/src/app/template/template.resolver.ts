import { Query, Resolver, Authorized } from "type-graphql";
import { Template } from "./template.schema";
import { TemplateService } from "./template.service";
import { AuthRolesEnum } from "../user/user.schema";

@Resolver(() => Template)
export class TemplateResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Template], {
        nullable: "items",
    })
    templates(): Promise<Template[]> {
        return new TemplateService().templates();
    }
}
