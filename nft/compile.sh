rm build/nft-item-editable-code.fif
rm build/nft-collection-editable-code.fif

func -o build/nft-item-editable-code.fif -SPA stdlib.fc params.fc op-codes.fc nft-item-editable-DRAFT.fc
func -o build/nft-collection-editable-code.fif -SPA stdlib.fc params.fc op-codes.fc nft-collection-editable.fc

fift -s build/print-hex.fif
