import fastify from "fastify"
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { createEvent } from "./routes/create-event"
import { registerForEvent } from "./routes/register-for-events"
import { getEvent } from "./routes/get-event"
import { getAttendeeBadge } from "./routes/get-attendee-badge"
import { checkIn } from "./routes/check-in"
import { getEventAttendees } from "./routes/get-event-attendees"
import { fastifySwagger } from "@fastify/swagger"
import { fastifySwaggerUi } from "@fastify/swagger-ui"
import { fastifyCors } from "@fastify/cors"

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in.',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("HTTP Server running")
})