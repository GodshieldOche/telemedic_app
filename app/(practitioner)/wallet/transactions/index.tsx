import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "../../../../components/Common/SearchInput";
import useAppDispatch from "../../../../hooks/useDispatch";
import { getAllTransactions } from "../../../../redux/slices/user/wallet";
import Loader from "../../../../components/Common/Loader";
import Transactions from "../../../../components/Transactions";
import { globalStyles } from "../../../../constants/styles";
import { AllOnWallet, Pagination } from "../../../../utils/interface";
import Filter from "../../../../components/Modals/Filter";
import Transaction, {
  TransactionFilter,
} from "../../../../components/Filters/Transaction";

type Data = Pagination & {
  data: AllOnWallet["transactions"];
};

const TransactionsList = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState<TransactionFilter>({
    start_date: undefined,
    end_date: undefined,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // dispatch(getAllTransactions({ signal })).then((res: any) => {
    //   if (!res.error) {
    //     setData(res.payload);
    //     setLoading(false);
    //   }
    // });

    return () => {
      controller.abort();
    };
  }, []);

  if (loading || !data) {
    return <Loader />;
  }

  const handlePagination = () => {
    if (data.total / data.items_per_page > page) {
      setPage((prevPage) => prevPage + 1);
      dispatch(getAllTransactions({ page: page + 1 })).then((res: any) => {
        if (!res.error) {
          setData(
            (prev) =>
              (prev = {
                ...(prev as Data),
                data: [...(prev as Data).data, ...res.payload.data],
              })
          );
        }
      });
    }
  };

  const handleSubmit = async (
    values: TransactionFilter,
    setSubmitting?: (isSubmitting: boolean) => void
  ) => {
    setFilters(values);
    setSubmitting?.(false);
    setModalVisible(false);
  };

  return (
    <View
      className="flex-1 py-4 bg-white"
      style={{
        paddingBottom: insets.bottom,
        rowGap: 24,
      }}
    >
      <View className="px-4">
        <SearchInput toggleFilter={setModalVisible} />
      </View>
      <View
        style={{
          rowGap: 16,
          flex: 1,
        }}
      >
        <Text
          className="text-base text-mainBlack px-4 "
          style={[globalStyles.semibold_text]}
        >
          Transactions
        </Text>
        <Transactions
          transactions={data.data}
          handleEndReached={handlePagination}
        />
      </View>

      <Filter
        modalVisible={modalVisible}
        clearAll={() => {
          setFilters({ start_date: undefined, end_date: undefined });
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      >
        <Transaction data={filters} handleSubmit={handleSubmit} />
      </Filter>
    </View>
  );
};

export default TransactionsList;
