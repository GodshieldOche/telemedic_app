import { View } from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import { Address } from "../../../../utils/interface";
import { messageAlert } from "../../../../components/Common/Alerts";
import Loader from "../../../../components/Common/Loader";
import { editAddress, getAddress } from "../../../../redux/slices/user/address";
import AddressForm from "../../../../components/User/AddressForm";
import { getCountries } from "../../../../redux/slices/app/country";

const EditShippingInformation = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isDataLoading, error } = useAppSelector(
    (state) => state.userAddress
  );
  const { loading, data: countries } = useAppSelector((state) => state.country);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCountries());
    dispatch(getAddress({ id, signal }));

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleSubmit = async (
    values: Address,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    const response = await dispatch(
      editAddress({
        body: values,
        id,
      })
    );

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

  if (isDataLoading || !data || loading) {
    return <Loader />;
  }

  if (error) {
    return <Redirect href="/(user)/settings/shipping_information/" />;
  }

  return (
    <ScrollView className="bg-white  flex-1">
      <View className="py-6 px-4">
        <AddressForm
          data={data}
          handleSubmit={handleSubmit}
          countries={countries}
        />
      </View>
    </ScrollView>
  );
};

export default EditShippingInformation;
