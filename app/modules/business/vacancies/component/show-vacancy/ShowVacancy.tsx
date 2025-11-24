import React from "react";
import { useShowVacancy } from "./hooks/useShowVacancy";
import { RenderHTMLShowVacancy } from "../render-html-vacancy/RenderHTMLShowVacancy";
import { TextStyles } from "@/app/theme/TextStyles";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "@/app/utils/sizes/constants/colors";

export const ShowVacancy = () => {
  const { data, isLoading } = useShowVacancy();

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ marginTop: hp("40%") }}
        size="large"
        color={colors.primary}
      />
    );
  }

  return (
    <View>
      <Text style={[TextStyles.h1, { marginBottom: hp("2%") }]}>
        {data?.positionTitle}
      </Text>
      <Text style={[TextStyles.p, { marginBottom: hp("0.7%") }]}>
        Jefe inmediato: {data?.supervisor}
      </Text>
      <Text style={[TextStyles.p, { marginBottom: hp("0.7%") }]}>
        Ubicación: {data?.city}, {data?.country}
      </Text>
      <Text style={[TextStyles.p, { marginBottom: hp("0.7%") }]}>
        Código del puesto: {data?.positionCode}
      </Text>
      <Text style={[TextStyles.p, { marginBottom: hp("2%") }]}>
        Responsable: {data?.personResponsible}
      </Text>

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>Conócenos</Text>
      <RenderHTMLShowVacancy
        html={data?.aboutUs ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        Tu próximo rol
      </Text>
      <RenderHTMLShowVacancy
        html={data?.challenge ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        ¡Imagínate haciendo esto!
      </Text>
      <RenderHTMLShowVacancy
        html={data?.imagineThis ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        ¿Qué necesitas?
      </Text>
      <RenderHTMLShowVacancy
        html={data?.whatNeed ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        Tenemos un reto para quienes quieran:
      </Text>
      <RenderHTMLShowVacancy
        html={data?.challenge ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        Te proponemos:
      </Text>
      <RenderHTMLShowVacancy
        html={data?.wePropose ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        Conoce más
      </Text>
      <RenderHTMLShowVacancy
        html={data?.knowMore ?? ""}
        style={{ marginBottom: hp("2%") }}
      />

      <Text style={[TextStyles.h2, { marginBottom: hp("2%") }]}>
        Declaratoria DEI
      </Text>
      <RenderHTMLShowVacancy
        html={data?.deiStatement ?? ""}
        style={{ marginBottom: hp("2%") }}
      />
    </View>
  );
};
