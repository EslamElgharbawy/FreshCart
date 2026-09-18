interface UseIsBusyProps {
  authChecked: boolean;
  loading: boolean;
}

export default function useIsBusy({
  authChecked,
  loading,
}: UseIsBusyProps) {
  return !authChecked || loading;
}