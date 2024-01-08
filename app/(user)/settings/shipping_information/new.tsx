import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { router } from "expo-router";
import { messageAlert } from "../../../../components/Common/Alerts";
import { Address } from "../../../../utils/interface";
import AddressForm from "../../../../components/User/AddressForm";
import { getCountries } from "../../../../redux/slices/app/country";
import Loader from "../../../../components/Common/Loader";
import { postAddAddress } from "../../../../redux/slices/user/address";

const NewShippingAddress = () => {
  const [data, _] = useState<Address>({
    country_id: "",
    state_id: "",
    city_id: "",
    street_line_one: "",
    postal_code: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    phone_code: "",
    is_default: false,
  });

  const { loading, data: countries } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const handleSubmit = async (
    values: Address,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const response = await dispatch(postAddAddress(values));

    if (response.error) {
      messageAlert(
        "Error",
        (response?.payload && response?.payload[0]?.error) ||
          "Something went wrong"
      );
      setSubmitting?.(false);
      return;
    }

    router.back();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <AddressForm
          data={data}
          countries={countries}
          handleSubmit={handleSubmit}
        />
      </View>
    </ScrollView>
  );
};

export default NewShippingAddress;
