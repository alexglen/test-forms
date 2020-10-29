import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ButtonSubmit from "../../ui/Button";
import { Checkbox } from "@material-ui/core";
import ComeBackButton from "../../ui/ComeBackButton";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Header from "../../Layouts/Header";
import Input from "../../ui/Input";
import { useData } from "../../context";
import { normalizePhoneNumber } from "../../utils";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Напишите Ваш корректный email")
    .required("Напишите Ваш email"),
});

const Step2 = () => {
  const history = useHistory();

  const { data, addData } = useData();

  const [checked, setChecked] = useState({
    checkboxTel: !!data.tel,
    checkboxGit: !!data.github,
  });

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      email: data.email,
      tel: data.tel,
      github: data.github,
    },
  });

  const onSubmit = (data) => {
    history.push("./step3");
    addData({ tel: "", github: "", ...data });
  };
  return (
    <Header>
      <h2>Шаг 2</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Ваш email"
          ref={register}
          id="email"
          name="email"
          type="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
        />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.checkboxTel}
                onChange={(event) =>
                  setChecked({
                    ...checked,
                    [event.target.name]: event.target.checked,
                  })
                }
                name="checkboxTel"
                color="primary"
              />
            }
            label="Вы можете оставить свой номер телефона для связи"
          />
        </div>

        {checked.checkboxTel && (
          <Input
            label="Ваш телефонный номер"
            ref={register}
            id="tel"
            name="tel"
            type="tel"
            onChange={({ target: { value } }) =>
              (value = normalizePhoneNumber(value))
            }
          />
        )}

        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked.checkboxGit}
                onChange={(event) =>
                  setChecked({
                    ...checked,
                    [event.target.name]: event.target.checked,
                  })
                }
                name="checkboxGit"
                color="primary"
              />
            }
            label="Вы можете отправить нам ссылку на свой аккаунт в GitHub"
          />
          {checked.checkboxGit && (
            <Input
              label="Ссылка на Ваш аккаунт в GitHub"
              ref={register}
              id="github"
              name="github"
              type="url"
            />
          )}
        </div>
        <ButtonSubmit type="submit">Далее</ButtonSubmit>
      </form>
      <ComeBackButton path="/" />
    </Header>
  );
};

export default Step2;
