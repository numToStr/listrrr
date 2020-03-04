import { Resolver, Query, Authorized } from "type-graphql";
import { Label } from "./label.schema";
import { LabelService } from "./label.service";
import { AuthRolesEnum } from "../user/user.schema";

@Resolver()
export class LabelResolver {
    @Authorized<AuthRolesEnum[]>([AuthRolesEnum.USER])
    @Query(() => [Label], {
        nullable: "items",
    })
    labels(): Promise<Label[]> {
        return new LabelService().labels();
    }
}
