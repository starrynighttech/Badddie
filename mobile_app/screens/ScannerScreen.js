import { BarCodeScanner } from "expo-barcode-scanner"

export default function ScannerScreen() {
  return (
    <BarCodeScanner
      style={{ flex: 1 }}
      onBarCodeScanned={({ data }) => {
        console.log("Product code:", data)
      }}
    />
  )
}
