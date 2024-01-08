import { Pressable, Text, View } from "react-native";
import React, { useEffect } from "react";
import EmptyButtonView from "../../../../components/Common/EmptyButtonView";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import Loader from "../../../../components/Common/Loader";
import { router } from "expo-router";
import { Iconify } from "react-native-iconify";
import { ScrollView } from "react-native-gesture-handler";
import HeaderSwitch from "../../../../components/Common/HeaderSwitch";
import relationship, {
  getFamilyAndFriends,
} from "../../../../redux/slices/user/relationship";
import ContactCard from "../../../../components/Common/ContactCard";
import { globalStyles } from "../../../../constants/styles";
import SearchInput from "../../../../components/Common/SearchInput";

const values = [
  { name: "My Medicare Contact", value: "accepted" },
  { name: "Pending Contact", value: "pending" },
];

const FamilyAndFriends = () => {
  const {
    relationships: { list },
    isListLoading,
  } = useAppSelector((state) => state.relationship);
  const [active, toggleActive] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleGetFamilyAndFriends = async (
    signal: AbortSignal,
    is_approved: boolean
  ) => {
    dispatch(getFamilyAndFriends({ signal, is_approved }));
  };

  const activeTab = values[active ? 1 : 0].value;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    handleGetFamilyAndFriends(signal, !active);

    return () => {
      controller.abort();
    };
  }, [active]);

  const handlePushToAdd = () => {
    router.push("/(user)/settings/relationships/new");
  };

  const handlePushToRequets = () => {
    router.push(`/(user)/settings/relationships/requests`);
  };
  const handlePushToDetails = (id: string) => {
    router.push(`/(user)/settings/relationships/${id}/`);
  };

  return (
    <View
      className="flex-1  py-4  bg-white"
      style={{
        rowGap: 24,
      }}
    >
      <HeaderSwitch
        values={values}
        active={active}
        handlePress={() => toggleActive(!active)}
      />

      {isListLoading ? (
        <Loader />
      ) : list.length < 1 ? (
        <EmptyButtonView
          title={
            active
              ? "You don't have any pending Family and Friend"
              : "You are yet to add a Family and Friend"
          }
          text={
            active
              ? "Go to your Family & Friends requests"
              : "Add New Family & Friend"
          }
          action={active ? handlePushToRequets : handlePushToAdd}
        />
      ) : (
        <View className="flex-1">
          <View className="pb-2 px-4 " style={{ rowGap: 20 }}>
            <View className="flex-row justify-end">
              <Pressable
                onPress={active ? handlePushToRequets : handlePushToAdd}
              >
                <Text
                  className="text-base text-primaryOne px-4"
                  style={[globalStyles.semibold_text]}
                >
                  {active ? "View Contact Requests" : "Add New Contact"}
                </Text>
              </Pressable>
            </View>
            <SearchInput
              placholder="Search by Name or Email address"
              hideFilter
            />
            <Text
              className="text-base text-mainBlack"
              style={[globalStyles.semibold_text]}
            >
              {active
                ? "Your Pending Contact on Medicare"
                : "Your Contact on Medicare"}
            </Text>
          </View>
          <ScrollView className="px-4 space-y-4 py-2">
            <View style={{ rowGap: 12 }}>
              {list.map((item) => (
                <ContactCard
                  {...item}
                  component={
                    <View
                      className="w-20 justify-center items-center rounded-full py-2"
                      style={{
                        backgroundColor: item.is_approved
                          ? "#8863F2"
                          : "#FFF4EC",
                      }}
                    >
                      <Text
                        className="capitalize text-xs "
                        style={[
                          globalStyles.semibold_text,
                          {
                            color: item.is_approved ? "#fff" : "#F5AF44",
                          },
                        ]}
                      >
                        {item.relationship}
                      </Text>
                    </View>
                  }
                  key={item.id}
                  handlePress={() => handlePushToDetails(item.id)}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default FamilyAndFriends;
