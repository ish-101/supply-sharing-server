import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            autoSchemaFile: 'autogenSchema.gql',
            context: ({ req }) => ({ req }),
            debug: true,
            tracing: true,
            introspection: true,
            playground: true
        }),
    ],
})
export class GraphqlModule {}