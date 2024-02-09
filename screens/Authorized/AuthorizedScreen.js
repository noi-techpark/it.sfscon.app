import { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, Platform } from "react-native";
import ButtonComponent from "../../components/UI/ButtonComponent";
import InputComponent from "../../components/UI/InputComponent";
import WrapperComponent from "../../components/Wrapper/WrapperComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  resetError,
  registerPretixUser,
} from "../../store/actions/AuthActions";
import { getTheme } from "../../tools/getTheme";
import getStyles from "./authorizedScreenStyles";
import { useIsFocused } from "@react-navigation/native";
import { usePushNotifications } from "../../notifications/usePushNotifications";
import { useForm, Controller } from "react-hook-form";

export default AuthorizedScreen = ({ setModal, type = null }) => {
  const theme = getTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { expoPushToken } = usePushNotifications();

  const inputRef = useRef();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const regError = useSelector((state) => state.auth.regError);
  const registeredUser = useSelector((state) => state.auth.registeredUser);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isFocused) {
      setDisabled(false);
    } else {
      reset();
    }
  }, [isFocused]);

  useEffect(() => {
    if (type === "modal" && registeredUser?.id) {
      setModal(false);
    }
  }, [registeredUser]);

  useEffect(() => {
    if (regError) {
      setLoading(false);
      setDisabled(false);
      dispatch(resetError());
    }
  }, [regError]);

  const registerUser = (data) => {
    const { pretixCode } = data;
    if (Object.keys(errors).length < 1) {
      dispatch(registerPretixUser(pretixCode, expoPushToken, Platform.OS));
      setLoading(true);
      setDisabled(true);
    }
  };

  return (
    <WrapperComponent>
      <View style={styles.container}>
        <Text style={styles.message}>
          In order to use this feature please enter your SFSCON ticket code
          (Pretix)
        </Text>

        <Controller
          control={control}
          name="pretixCode"
          render={({ field: { onChange, value, onBlur } }) => (
            <InputComponent
              error={errors?.pretixCode}
              errorMessage={errors?.pretixCode?.message ?? ""}
              ref={inputRef}
              label={"SFSCON ticket code (Pretix) (ex. GRY7A)"}
              value={value}
              handleChange={(val) => {
                onChange(val);
              }}
              handleBlur={onBlur}
              stylesProp={{ input: styles.input, label: styles.label }}
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Field is required!",
            },
          }}
        />

        <ButtonComponent
          disabled={disabled}
          loading={loading}
          handlePress={handleSubmit(registerUser)}
          label={"Confirm"}
        />

        {type === "modal" && (
          <ButtonComponent
            disabled={disabled}
            handlePress={() => setModal(false)}
            label={"Cancel"}
            stylesProp={{
              button: { ...styles.button, ...styles.secondaryButton },
              label: { ...styles.label, ...styles.secondaryLabel },
            }}
          />
        )}
      </View>
    </WrapperComponent>
  );
};
