import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Header from "../../../components/User/Home/Header";
import Loader from "../../../components/Common/Loader";
import Services from "../../../components/User/Home/Services";
import Upcoming from "../../../components/User/Home/Upcoming";
import List from "../../../components/User/Home/List";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { useEffect } from "react";
import { getAllResources } from "../../../redux/slices/app/resources";
import { Iconify } from "react-native-iconify";
import { globalStyles } from "../../../constants/styles";

export default function TabOneScreen() {
  const { data } = useAppSelector((state) => state.userProfile);
  const { data: resources, loading } = useAppSelector(
    (state) => state.resources
  );

  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllResources());
  }, []);

  if (!data || loading) {
    return <Loader />;
  }

  return (
    <View
      className="bg-white  flex-1 "
      style={{
        paddingTop: insets.top,
      }}
    >
      <ScrollView className=" py-6 flex-1">
        <View
          className="flex-1"
          style={{
            flexDirection: "column",
            rowGap: 16,
            padding: 0,
            margin: 0,
          }}
        >
          {/* Header */}
          <Header data={data} />
          <Services />
          <Upcoming />
          {resources.length === 0 ? (
            <View className="flex-1 justify-center space-y-2 pt-20 items-center">
              <Iconify
                icon="tabler:mood-smile-filled"
                size={48}
                color="#8863F2"
              />
              <Text
                className="text-mainBalck text-base "
                style={[globalStyles.regular_text]}
              >
                No available resources at the moment
              </Text>
            </View>
          ) : (
            <List resources={resources} />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
