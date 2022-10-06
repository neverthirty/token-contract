rm build/nft-item-code.fif
rm build/nft-collection-editable-code.fif

func -o build/nft-item-code.fif -SPA stdlib.fc params.fc op-codes.fc nft-item.fc
func -o build/nft-collection-editable-code.fif -SPA stdlib.fc params.fc op-codes.fc nft-collection-utils.fc nft-collection-editable.fc

fift -s build/print-hex.fif
