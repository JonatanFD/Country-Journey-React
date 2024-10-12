import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";


const formSchema = z.object({
  from: z.string({message: "El origen es requerido"}),
  to: z.string({message: "El destino es requerido"}),
  filters: z.string().optional(),
})

export default function JourneyForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  })


    return (
        <section className="absolute top-4 left-4 z-30">
            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="from"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Origen
                              </FormLabel>

                              <FormControl>
                                <Input {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                        )}
                     />

                    <FormField
                        control={form.control}
                        name="to"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Destino
                              </FormLabel>

                              <FormControl>
                                <Input {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                        )}
                      />

                    <Button className="w-full">Buscar</Button>
                </form>
            </Form>
        </section>
    );
}
