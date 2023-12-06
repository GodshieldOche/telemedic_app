import { ScrollView } from "react-native-gesture-handler";
import useAppDispatch, { useAppSelector } from "../../../hooks/useDispatch";
import Header from "../../../components/User/Home/Header";
import Loader from "../../../components/Common/Loader";
import Services from "../../../components/User/Home/Services";
import Upcoming from "../../../components/User/Home/Upcoming";
import List from "../../../components/User/Home/List";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";
import { useEffect } from "react";
import { getAllResources } from "../../../redux/slices/app/resources";

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
      className="bg-white flex-1 "
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
          <List resources={resources} />
        </View>
      </ScrollView>
    </View>
  );
}
