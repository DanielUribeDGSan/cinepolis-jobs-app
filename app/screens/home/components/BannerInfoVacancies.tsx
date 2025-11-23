import { containers } from "@/app/utils/sizes/constants/containers";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextStyles } from "../../../theme/TextStyles";

const BannerInfoVacancies = () => {
  return (
    <View
      style={{
        paddingBottom: hp(containers.bottomComponent),
      }}
    >
      <Text
        style={{
          ...TextStyles.h1,
          marginBottom: hp(containers.bottomParagraph),
        }}
      >
        Nuestras historias se proyectan en todo el mundo, y no conocen
        fronteras.
      </Text>
      <Text style={{ ...TextStyles.p }}>
        En cada país, siempre hay un lugar reservado para ti.
      </Text>
      <Text
        style={{
          ...TextStyles.p,
          marginBottom: hp(containers.bottomParagraph),
        }}
      >
        Porque más allá del cine, proyectamos historias reales: la tuya, la
        nuestra, la de todos.
      </Text>
      <Text style={{ ...TextStyles.p }}>
        Actualmente tenemos 1255 vacantes en 358 ciudades alrededor de 18
        países.
      </Text>
    </View>
  );
};

export default BannerInfoVacancies;
