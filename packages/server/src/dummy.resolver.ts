import { Query, Resolver } from "type-graphql";

@Resolver()
export class Dummy {
    @Query(() => Boolean)
    hello() {
        return true;
    }
}
