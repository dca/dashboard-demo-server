import { Module } from '@nestjs/common'
import { OtelService } from './otel.service'
import {
  OpenTelemetryModule,
  ControllerInjector,
  GuardInjector,
  EventEmitterInjector,
  ScheduleInjector,
  PipeInjector,
  ConsoleLoggerInjector,
  OpenTelemetryModuleDefaultConfig
} from '@amplication/opentelemetry-nestjs'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { PrismaInstrumentation } from '@prisma/instrumentation'

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      serviceName: 'myapp',
      traceAutoInjectors: [
        ControllerInjector,
        GuardInjector,
        EventEmitterInjector,
        ScheduleInjector,
        PipeInjector,
        ConsoleLoggerInjector
        // LoggerInjector
      ],
      instrumentations: [
        ...OpenTelemetryModuleDefaultConfig.instrumentations,
        new PrismaInstrumentation({ middleware: true })
      ],
      spanProcessor: new SimpleSpanProcessor(
        new ZipkinExporter({
          url: 'http://localhost:9411/api/v2/spans'
        })
      ) as any
    })
  ],
  providers: [OtelService],
  exports: [OtelService]
})
export class OtelModule {}
