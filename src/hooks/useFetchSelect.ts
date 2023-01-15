import { et } from "element-plus/es/locale";
import { onMounted, reactive, ref } from "vue";
interface FetchSelectProps {
  fetchAPi: () => Promise<any[]>;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  key?: string;
}

export function useFetchSelect(props: FetchSelectProps) {
  const { fetchAPi } = props;

  const loading = ref(false);

  const options = ref<SelectOption[]>([]);

  const loadData = () => {
    loading.value = true;
    options.value = [];

    return fetchAPi().then(
      (data) => {
        loading.value = false;
        options.value = data;
        return data;
      },
      (err) => {
        loading.value = false;
        options.value = [{ value: "-1", label: err.message, disabled: true }];
        return Promise.reject(err);
      }
    );
  };

  onMounted(() => {
    loadData();
  });

  return reactive({
    options,
    loading,
  });
}
