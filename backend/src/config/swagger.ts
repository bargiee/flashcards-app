import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Flashcards API',
            version: '1.0.0',
            description: 'API documentation for Remind flashcards app',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 8080}/api`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 7 },
                        username: { type: 'string', example: 'johndoe' },
                        email: { type: 'string', example: 'john@example.com' },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                    },
                },
                Deck: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 3 },
                        userId: { type: 'integer', example: 7 },
                        name: { type: 'string', example: 'Biology - Chapter 1' },
                        description: {
                            type: 'string',
                            nullable: true,
                            example: 'Cell structure',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                    },
                },
                Flashcard: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 15 },
                        deckId: { type: 'integer', example: 3 },
                        term: { type: 'string', example: 'Mitosis' },
                        definition: {
                            type: 'string',
                            example: 'Process of cell division',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                    },
                },
                FavoriteDeck: {
                    type: 'object',
                    properties: {
                        userId: { type: 'integer', example: 7 },
                        deckId: { type: 'integer', example: 3 },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                    },
                },
                Progress: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', example: 22 },
                        userId: { type: 'integer', example: 7 },
                        flashcardId: { type: 'integer', example: 15 },
                        lastReviewed: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                        reviewCount: { type: 'integer', example: 5 },
                        successCount: { type: 'integer', example: 4 },
                        failCount: { type: 'integer', example: 1 },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2025-01-01T14:00:00.000Z',
                        },
                    },
                },

                ErrorResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'integer', example: 404 },
                        error: { type: 'string', example: 'Resource not found' },
                    },
                },
            },
            responses: {
                ServerError: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/ErrorResponse' },
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export default swaggerOptions;
