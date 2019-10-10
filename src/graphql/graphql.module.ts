import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
    imports: [
        GraphQLModule.forRoot({
            playground: true,
            autoSchemaFile: 'autogenSchema.gql',
            context: ({ req }) => ({ req }),
        }),
    ],
})
export class GraphqlModule {}