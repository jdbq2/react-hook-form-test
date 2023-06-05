import { Box, Button, TextField } from "@mui/material";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

interface FormValues {
  userName: string;
  userPassword: string;
  phNumbers: {
    number: string;
  }[];
}

const App = () => {
  const { register, control, handleSubmit, formState, watch, reset } =
    useForm<FormValues>({
      defaultValues: {
        userName: "",
        userPassword: "",
        phNumbers: [{ number: "" }],
      },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };

  const onSubmit = (data: FormValues) => {
    console.log("formulario Enviado", data);
  };

  /*
  useEffect(() => {
    const subscription = watch((value) => console.log(value));
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);
  */

  renderCount++;

  return (
    <>
      <h3>RenderCount: {renderCount / 2}</h3>
      <Box
        onSubmit={handleSubmit(onSubmit, onError)}
        component={"form"}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          label="Name"
          margin="dense"
          error={formState.errors?.userName?.message ? true : false}
          helperText={
            formState.errors?.userName?.message
              ? formState.errors?.userName?.message
              : ""
          }
          {...register("userName", {
            required: { value: true, message: "User Name is required" },
          })}
        />
        <TextField
          label="Password"
          type="password"
          margin="dense"
          error={formState.errors?.userPassword?.message ? true : false}
          helperText={
            formState.errors?.userPassword?.message
              ? formState.errors?.userPassword?.message
              : ""
          }
          {...register("userPassword", {
            required: { value: true, message: "Password is required" },
          })}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {fields.map((field, index) => (
            <TextField
              key={field.id}
              label={`Phone Number ${index}`}
              margin="dense"
              {...register(`phNumbers.${index}.number`)}
            />
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => append({ number: "" })}
          >
            Add Phone Number
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => remove(fields.length - 1)}
          >
            Remove Phone Number
          </Button>
        </Box>

        <Button variant="contained" color="primary" onClick={() => reset()}>
          Reset
        </Button>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!formState.isValid || !formState.isDirty}
          sx={{ mt: 5 }}
        >
          Submit
        </Button>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default App;
