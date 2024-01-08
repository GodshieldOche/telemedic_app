import { View, Text } from "react-native";
import React, { useEffect } from "react";
import SearchInput from "../../../../components/Common/SearchInput";
import useAppDispatch, { useAppSelector } from "../../../../hooks/useDispatch";
import {
  postAddAddFamilyAndFriend,
  searchContacts,
} from "../../../../redux/slices/user/relationship";
import Loader from "../../../../components/Common/Loader";
import { ScrollView } from "react-native-gesture-handler";
import ContactCard from "../../../../components/Common/ContactCard";
import { globalStyles } from "../../../../constants/styles";
import Button from "../../../../components/Common/Button";
import BottomSheet from "../../../../components/Modals/BottomSheet";
import { RadioButton, RadioGroup } from "react-native-ui-lib";
import { messageAlert } from "../../../../components/Common/Alerts";
import { router } from "expo-router";

const relationshipTypes = [
  {
    value: "parent",
    label: "Parent",
  },
  {
    value: "child",
    label: "Child",
  },
  {
    value: "sibling",
    label: "Sibling",
  },
  {
    value: "spouse",
    label: "Spouse",
  },
  {
    value: "friend",
    label: "Friend",
  },
];

const NewRelationship = () => {
  const [query, setQuery] = React.useState<string>("");
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [selectedRelationship, setSelectedRelationship] =
    React.useState<string>();
  const [selectedId, setSelectedId] = React.useState<string>("");
  const [isSubmitting, setSubmitting] = React.useState<boolean>(false);

  const { contacts, isContactsLoading } = useAppSelector(
    (state) => state.relationship
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(searchContacts({ signal, query }));

    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSendRequest = async () => {
    const body = {
      related_to_id: selectedId,
      relationship: selectedRelationship,
    };
    setSubmitting(true);
    const res = await dispatch(postAddAddFamilyAndFriend(body));

    if (res.error) {
      messageAlert(
        "Error",
        (res?.payload && res?.payload[0]?.error) || "Something went wrong"
      );
      return setSubmitting(false);
    }

    setSubmitting(false);
    setModalVisible(false);
    router.push("/(user)/settings/relationships");
  };

  return (
    <View className="flex-1 bg-white space-y-3 py-3">
      <View className="px-4">
        <SearchInput
          placholder="Search by Name or Email address"
          setQuery={setQuery}
          hideFilter
        />
      </View>
      <View className="flex-1 space-y-2 ">
        <Text
          className="text-base text-mainBlack px-4"
          style={[globalStyles.semibold_text]}
        >
          Add Medicare Contacts
        </Text>
        {isContactsLoading ? (
          <Loader />
        ) : (
          <ScrollView className="px-4">
            <View className="py-3" style={{ rowGap: 12 }}>
              {contacts.map((contact) => (
                <ContactCard
                  {...contact}
                  component={
                    <View>
                      <Button
                        text="Add As"
                        styles={{ width: 85, paddingVertical: 6 }}
                        textStyles={{ fontSize: 13 }}
                        action={() => {
                          setSelectedId(contact.id);
                          setSelectedRelationship(undefined);
                          setModalVisible(true);
                        }}
                      />
                    </View>
                  }
                  key={contact.id}
                />
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Bottom Sheet Modal */}
      <BottomSheet
        modalVisible={modalVisible}
        closeModal={() => {
          setModalVisible(false);
          setSelectedId("");
          setSelectedRelationship(undefined);
        }}
      >
        <View className="space-y-8 pb-3">
          <View className="px-[19px] py-[21px] bg-primaryGray rounded-lg ">
            <RadioGroup
              initialValue={selectedRelationship}
              onValueChange={(value: any) => setSelectedRelationship(value)}
              style={{
                rowGap: 16,
              }}
            >
              {relationshipTypes.map((relationship) => (
                <RadioButton
                  contentOnLeft
                  containerStyle={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    backgroundColor: "white",
                    borderRadius: 8,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    color: "#2B2B2B",
                    ...globalStyles.semibold_text,
                  }}
                  size={18}
                  value={relationship.value}
                  label={relationship.label}
                  key={relationship.value}
                />
              ))}
            </RadioGroup>
          </View>
          <View className="px-5">
            <Button
              text="Send Request"
              disabled={!selectedRelationship}
              loading={isSubmitting}
              action={handleSendRequest}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default NewRelationship;
